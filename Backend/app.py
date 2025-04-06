import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI
import anthropic

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

# Request model for code generation
class CodeGenerationRequest(BaseModel):
    prompt: str
    currentFile: str

# Response model for code generation
class CodeGenerationResponse(BaseModel):
    code: str

# Function to generate code using OpenAI
def generate_code_with_openai(prompt: str, current_file: str):
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
    # Determine file type and context
    file_type = current_file.split('.')[-1]
    context_map = {
        'html': "You are an expert web developer creating HTML files. Generate clean, semantic, and modern HTML code.",
        'css': "You are an expert web designer creating CSS files. Generate clean, responsive, and modern CSS styles.",
        'js': "You are an expert JavaScript developer. Generate clean, modern, and efficient JavaScript code."
    }
    
    # Craft the system prompt
    system_prompt = context_map.get(file_type, "You are an expert web developer.")
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": prompt}
            ]
        )
        
        # Extract the generated code
        generated_code = response.choices[0].message.content.strip()
        
        # Remove any potential markdown code block formatting
        if generated_code.startswith("```") and generated_code.endswith("```"):
            generated_code = generated_code[3:-3].strip()
        
        return generated_code
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")

# Function to generate code using Anthropic Claude
def generate_code_with_claude(prompt: str, current_file: str):
    client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    
    # Determine file type and context
    file_type = current_file.split('.')[-1]
    context_map = {
        'html': "You are an expert web developer creating HTML files. Generate clean, semantic, and modern HTML code.",
        'css': "You are an expert web designer creating CSS files. Generate clean, responsive, and modern CSS styles.",
        'js': "You are an expert JavaScript developer. Generate clean, modern, and efficient JavaScript code."
    }
    
    # Craft the system prompt
    system_prompt = context_map.get(file_type, "You are an expert web developer.")
    
    try:
        response = client.messages.create(
            model="claude-3-sonnet-20240229",
            max_tokens=1000,
            messages=[
                {"role": "user", "content": prompt}
            ],
            system=system_prompt
        )
        
        # Extract the generated code
        generated_code = response.content[0].text.strip()
        
        # Remove any potential markdown code block formatting
        if generated_code.startswith("```") and generated_code.endswith("```"):
            generated_code = generated_code[3:-3].strip()
        
        return generated_code
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Anthropic API error: {str(e)}")

# Endpoint for code generation
@app.post("/api/generate", response_model=CodeGenerationResponse)
async def generate_code(request: CodeGenerationRequest):
    # Choose between OpenAI and Claude (you can add logic to switch or prefer one)
    # Here we're using OpenAI, but you can easily swap or add a selection mechanism
    generated_code = generate_code_with_openai(request.prompt, request.currentFile)
    
    return {"code": generated_code}

# Run the server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)