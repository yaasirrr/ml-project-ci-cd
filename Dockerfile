FROM python:3.8-slim-buster

WORKDIR /app

COPY . .

# install system dependencies needed by ML libraries
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# upgrade pip
RUN pip install --upgrade pip

# install python dependencies
RUN pip install --no-cache-dir -r mlproject/requirements.txt

RUN pip install gunicorn

EXPOSE 5000

CMD ["python","mlproject/app.py"]