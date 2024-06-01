# Configure metadata
ARG POETRY_VERSION="1.3.2"
ARG PYTHON_VERSION="3.12"
ARG PYTHON_DIST="bookworm"

# --- builder ----
FROM "docker.io/library/python:${PYTHON_VERSION}-${PYTHON_DIST}" as builder

# Configure poetry environment variables
ARG POETRY_CACHE_DIR=/tmp/poetry_cache
ENV POETRY_NO_INTERACTION=1
ARG POETRY_VERSION
ENV POETRY_VIRTUALENVS_CREATE=1
ENV POETRY_VIRTUALENVS_IN_PROJECT=1

# Install poetry
RUN pip install --no-cache-dir "poetry==${POETRY_VERSION}"

# Load package metadata
WORKDIR /app
COPY pyproject.toml poetry.lock ./

# Install package dependencies
RUN --mount=type=cache,target=${POETRY_CACHE_DIR} \
    poetry install --no-root --without dev

# --- runtime ----
FROM "docker.io/library/python:${PYTHON_VERSION}-slim-${PYTHON_DIST}" as runtime

# Configure runtime environment variables
ENV PATH="/app/.venv/bin:${PATH}"

# Set working directory
WORKDIR /app

# Copy virtual environment from the builder
COPY --from=builder /app/.venv .venv

# Copy application source code
COPY . .

# Set the entrypoint and command to run FastAPI
ENTRYPOINT ["python", "-m", "uvicorn"]
CMD ["main:app", "--host", "0.0.0.0", "--port", "8000"]

# Expose the application port
EXPOSE 8000