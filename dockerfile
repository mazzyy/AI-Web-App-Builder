# Stage 1: Build the frontend
FROM nginx:alpine AS frontend

# Copy frontend files
COPY frontend /usr/share/nginx/html

# Expose port for frontend
EXPOSE 80

# Stage 2: Build the backend
FROM python:3.9-slim AS backend

# Set working directory
WORKDIR /app

# Copy backend files
COPY backend /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port for backend
EXPOSE 8000

# Command to run the backend
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]