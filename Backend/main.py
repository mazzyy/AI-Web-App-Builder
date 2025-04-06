import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Request model for code generation
class CodeGenerationRequest(BaseModel):
    prompt: str
    currentFile: str

# Response model for code generation
class CodeGenerationResponse(BaseModel):
    code: str

# Function to generate code using Gemini
def generate_code_with_gemini(prompt: str, current_file: str):
    # Determine file type and context
    file_type = current_file.split('.')[-1]
    context_map = {
        'html': """You are an expert web developer creating HTML files. 
        Generate clean, semantic, and modern HTML code. 
        - Use proper HTML5 semantic elements
        - Ensure responsive design considerations
        - Include relevant meta tags
        - Create well-structured, accessible HTML
        The output should be pure code without any additional explanations or markdown formatting.""",
        
        'css': """You are an expert web designer creating CSS files. 
        Generate clean, responsive, and modern CSS styles.
        - Use flexbox or grid for layouts
        - Implement responsive design techniques
        - Follow modern CSS best practices
        - Use CSS variables for consistent theming
        The output should be pure CSS code without any additional explanations or markdown formatting.""",
        
        'js': """You are an expert JavaScript developer. 
        Generate clean, modern, and efficient JavaScript code.
        - Use modern ES6+ syntax
        - Implement best practices for performance
        - Write clear, readable, and maintainable code
        - Use arrow functions, destructuring, and other modern JS features
        The output should be pure JavaScript code without any additional explanations or markdown formatting."""
    }
    
    # Craft the full prompt
    full_prompt = f"{context_map.get(file_type, 'You are an expert web developer.')}\n\nUser request: {prompt}"
    
    try:
        # Select the appropriate model
        model = genai.GenerativeModel('gemini-2.0-flash')
        
        # Generate the response
        response = model.generate_content(full_prompt)
        
        # Extract the generated code
        generated_code = response.text.strip()
        
        # Remove any potential markdown code block formatting
        if generated_code.startswith("```") and generated_code.endswith("```"):
            generated_code = generated_code[3:-3].strip()
        
        return generated_code
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini API error: {str(e)}")

# Endpoint for code generation
# In the generate_code function
@app.post("/api/generate", response_model=CodeGenerationResponse)
async def generate_code(request: CodeGenerationRequest):
    print(f"Received request: {request}")
    
    try:
        # Use Gemini for code generation
        generated_code = generate_code_with_gemini(request.prompt, request.currentFile)
        
        print(f"Generated code for {request.currentFile}:")
        print(generated_code)
        
        return {"code": generated_code}
    except Exception as e:
        print(f"Error in generate_code: {e}")
        raise

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)