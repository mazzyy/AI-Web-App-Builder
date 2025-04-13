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
    currentContent: str = ""  # Add current content field

# Response model for code generation
class CodeGenerationResponse(BaseModel):
    code: str

# Function to generate code using Gemini
def generate_code_with_gemini(prompt: str, current_file: str, current_content: str = ""):
    # Determine file type and context
    file_type = current_file.split('.')[-1]
    
    # Base contexts for different file types
    context_map = {
        'html': """You are an expert UI/UX web developer specializing in beautiful, modern HTML layouts.

Your task is to create professional-grade HTML that follows these principles:
- Use semantic HTML5 elements (header, nav, main, section, article, footer)
- Implement a clean, visually appealing structure
- Include proper meta tags and viewport settings for responsiveness
- Design for accessibility with appropriate ARIA attributes and semantic structure
- Create well-organized content with clear visual hierarchy
- Ensure the code is valid, properly indented, and follows best practices

Focus on creating a visually impressive UI that resembles professional websites.
The design should feel modern, clean, and incorporate current web design trends.

Important: Return ONLY the HTML code without any explanations, comments about the code, or markdown formatting.""",
        
        'css': """You are an expert CSS designer who creates stunning, professional-grade stylesheets.

Your task is to craft beautiful CSS that follows these principles:
- Use modern CSS features (flexbox, grid, CSS variables, etc.)
- Create visually appealing color schemes and typography
- Implement responsive design with mobile-first approach
- Add subtle animations and transitions for a polished feel
- Use CSS best practices for maintainability
- Include appropriate hover/focus states for interactive elements
- Optimize for performance by using efficient selectors

Focus on creating a premium visual experience with:
- Proper spacing and alignment principles
- Attractive color harmonies and gradients when appropriate
- Modern typography with proper hierarchy
- Subtle shadows, rounded corners, and other refined details
- Smooth transitions and micro-interactions

Important: Return ONLY the CSS code without any explanations, comments, or markdown formatting.""",
        
        'js': """You are an expert JavaScript developer specializing in creating interactive, high-quality web experiences.

Your task is to write clean, modern JavaScript that follows these principles:
- Use ES6+ features (arrow functions, destructuring, template literals, etc.)
- Create smooth, engaging user interactions and animations
- Implement efficient event handling and DOM manipulation
- Write modular, reusable code with clear organization
- Follow best practices for performance optimization
- Ensure cross-browser compatibility
- Add thoughtful error handling

Focus on enhancing the user experience with:
- Smooth scrolling effects
- Interactive UI elements that respond to user actions
- Form validation with helpful feedback
- Dynamic content loading or manipulation
- Subtle animations and transitions
- Responsive behavior adjustments

Important: Return ONLY the JavaScript code without any explanations, comments about the code, or markdown formatting."""
    }
    
    # Get base context for the file type
    base_context = context_map.get(file_type, 'You are an expert web developer.')
    
    # Add UI/UX guidance
   # Add UI/UX guidance
    ui_guidance = """
    UI/UX guidance:
    - Use a modern, clean aesthetic with appropriate white space
    - Create a visually balanced layout with clear visual hierarchy
    - Implement subtle animations and transitions for a polished feel
    - Use a cohesive, attractive color scheme (prefer modern color combinations)
    - Include responsive behaviors for all screen sizes
    - Add appropriate hover/focus states for interactive elements
    - Consider accessibility in all design decisions
    - For any image placeholder, do not add actual image files.
    Instead, use a gray gradient box with centered descriptive text (e.g., 'Image Placeholder') styled appropriately.

    The resulting code should create a professional-looking UI that resembles
    high-quality websites and applications found in 2024.
    """

    
    # Add context awareness for existing code
    context_awareness = ""
    if current_content:
        context_awareness = f"""
        IMPORTANT: I'm providing you with the CURRENT CODE in the file. Instead of creating something from scratch,
        you should MODIFY and IMPROVE this existing code based on the user's request.
        
        CURRENT CODE:
        ```
        {current_content}
        ```
        
        Your task is to understand this code, then modify or enhance it according to the user's request below.
        Preserve the existing structure and functionality while making improvements.
        Only replace the code completely if that's explicitly requested or if the current code is minimal/placeholder content.
        """
    
    # Craft the full prompt
    full_prompt = f"{base_context}\n\n{ui_guidance}\n\n{context_awareness}\n\nUser request: {prompt}"
    
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
        elif "```" in generated_code:
            # Handle cases where there might be a language identifier or multiple code blocks
            inside_code_block = False
            cleaned_lines = []
            
            for line in generated_code.split('\n'):
                if line.startswith("```"):
                    inside_code_block = not inside_code_block
                    continue
                if not line.startswith("```") and not inside_code_block:
                    cleaned_lines.append(line)
            
            generated_code = '\n'.join(cleaned_lines).strip()
        
        return generated_code
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini API error: {str(e)}")

# Endpoint for code generation
@app.post("/api/generate", response_model=CodeGenerationResponse)
async def generate_code(request: CodeGenerationRequest):
    print(f"Received request: Prompt: '{request.prompt[:50]}...', File: {request.currentFile}")
    
    try:
        # Use Gemini for code generation
        generated_code = generate_code_with_gemini(
            request.prompt, 
            request.currentFile,
            request.currentContent
        )
        
        print(f"Generated code for {request.currentFile} (first 100 chars):")
        print(generated_code[:100] + "...")
        
        return {"code": generated_code}
    except Exception as e:
        print(f"Error in generate_code: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)