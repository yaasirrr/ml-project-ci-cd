FROM python:3.8-slim-bullseye

WORKDIR /app

COPY . .

RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip

RUN pip install --no-cache-dir -r mlproject/requirement.txt

RUN pip install gunicorn

EXPOSE 5000

CMD ["python","mlproject/app.py"]