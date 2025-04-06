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
        'html': "You are an expert web developer creating HTML files. Generate clean, semantic, and modern HTML code. The output should be pure code without any additional explanations or markdown formatting.",
        'css': "You are an expert web designer creating CSS files. Generate clean, responsive, and modern CSS styles. The output should be pure CSS code without any additional explanations or markdown formatting.",
        'js': "You are an expert JavaScript developer. Generate clean, modern, and efficient JavaScript code. The output should be pure JavaScript code without any additional explanations or markdown formatting."
    }
    
    # Craft the full prompt
    full_prompt = f"{context_map.get(file_type, 'You are an expert web developer.')}\n\nUser request: {prompt}"
    
    try:
        # Select the appropriate model based on the task
        model = genai.GenerativeModel('gemini-pro')
        
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
@app.post("/api/generate", response_model=CodeGenerationResponse)
async def generate_code(request: CodeGenerationRequest):
    # Use Gemini for code generation
    generated_code = generate_code_with_gemini(request.prompt, request.currentFile)
    
    return {"code": generated_code}

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)