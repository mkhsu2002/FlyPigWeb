FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY static/ static/
COPY templates/ templates/
COPY main.py .

# Run as non-root user
RUN useradd -m flypiguser
USER flypiguser

# Expose port
EXPOSE 5000

# Run the application
CMD ["python", "main.py"]
