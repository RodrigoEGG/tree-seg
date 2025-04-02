# Project Overview

This project is built using a tech stack that includes:

- **Backend**: FastAPI + Uvicorn for the microservices.
- **Frontend**: React + Vite for fast development & ShadCN for UI components.
- **Segmentation ML Algorithm**: A Python-based machine learning service managed through a Conda environment.

This project consists of three main components:

1. **Backend** - Built using FastAPI.
2. **Frontend** - Built using React with Vite and ShadCN components.
3. **Segmentation ML Algorithm** - Machine learning model for processing data.

## Backend

The backend is implemented using FastAPI and serves as the API layer of the application.

### Installation

1. Clone the repository:

```bash
cd <project_directory>/backend
```

2. Create a virtual environment:

```bash
cd microservices/
```

3. Create virutal enviornment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
```

4. Install dependencies:

```bash
pip install fastapi uvicorn
```

5. Running the Backend

Start the FastAPI server using Uvicorn:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
The API documentation is available at:
- Swagger UI: http://127.0.0.1:8000/docs
- Redoc: http://127.0.0.1:8000/redoc

## Frontend

The frontend is built using React with Vite and utilizes ShadCN components.
### Installation

1. Install Node.js:

- Download and install Node.js from the official website.

2. Verify the installation:

```bash
node -v
npm -v
```

3. Navigate to the frontend directory:

```bash
cd <project_directory>/app
```

4. Install dependencies:
```bash
npm install
```

5. Running the Frontend

Start the development server:
```bash
npm run dev
```

## Segmentation Algorithm

The Segmentation Algorithm is responsible for processing data using a machine learning model and requires a Conda environment for dependency management. This serves as the component for segmenting the individual trees.
Installation

1. Navigate to the ML service directory:

```bash
cd <project_directory>/ai
```

2. Create and activate the Conda environment:

```bash
conda create --name ml_env python=3.12
conda activate ml_env
```

3. install dependencies

```bash
pip install -r requirements.txt
```

4. Running the Segmentation algorithm

```bash
python treeiso.py
```

## License
This project is licensed under **MIT License.**
