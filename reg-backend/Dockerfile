FROM python

# COPY the backend source file
COPY ./src /app/src
# Copy requirements.txt
COPY ./src/requirements.txt /app

# Specifying the work directory
WORKDIR /app/src

#Port to be exposed to the outside
EXPOSE 8000

RUN pip install --upgrade pip

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# Command to execute on startup
CMD ["uvicorn", "main:app","--host", "0.0.0.0","--port","80","--reload"]
