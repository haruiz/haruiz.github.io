import base64
import urllib.error
import urllib.parse
import urllib.request
import json
import os


def read_image(image_path: str) -> bytes:
    """
    Read image from file and return as bytes
    :param image_path: path of the image
    :return: image as bytes
    """
    # read and load the image into memory
    with open(image_path, "rb") as f:
        return f.read() # read the image's bytes


def image_to_base64(image_bytes: bytes) -> str:
    """
    Convert image to base64 string
    :param image_bytes:
    :return:
    """
    # Convert image to base64 string, so it can be sent to the API
    return base64.b64encode(image_bytes).decode("utf-8")


def call_face_detection_gcp_api(image_bytes: bytes, API_KEY: str = None) -> dict:
    """
    Call Google Cloud Platform Face Detection API
    :param API_KEY: API Key for Google Cloud Platform
    :param image_bytes: image as bytes
    :return:
    """
    api_url = f"https://vision.googleapis.com/v1/images:annotate?key={API_KEY}"
    image_base64 = image_to_base64(image_bytes)
    request_body = {
        "requests": [
            {
                "image": {
                    "content": image_base64
                },
                "features": [
                    {
                        "type": "FACE_DETECTION",
                        "maxResults": 10
                    }
                ]
            }
        ]
    }
    # Convert request body to JSON format
    request_body = json.dumps(request_body).encode("utf-8")
    # Create request
    request = urllib.request.Request(api_url, data=request_body)
    # Set request header
    request.add_header("Content-Type", "application/json")
    try:
        # Send request
        response = urllib.request.urlopen(request)
        # Read response body as bytes
        response_body_bytes = response.read()
        # # Convert response body to JSON format
        response_body_text = response_body_bytes.decode("utf-8")
        # Convert response body to JSON format
        response_body_json = json.loads(response_body_text)
        # Convert response to JSON format
        return response_body_json["responses"][0]["faceAnnotations"]

    except urllib.error.HTTPError as e:
        # Get error message
        error_message = json.loads(e.read())["error"]["message"]
        error_code = e.code
        if e.code == 400:
            error_status = "Bad Request"
        elif e.code == 401:
            error_status = "Unauthorized"
        elif e.code == 403:
            error_status = "Forbidden"
        elif e.code == 404:
            error_status = "Not Found"
        elif e.code == 500:
            error_status = "Internal Server Error"
        elif e.code == 503:
            error_status = "Service Unavailable"
        else:
            error_status = "Unknown Error"
        raise Exception(f"Error {error_code} calling the GCP Face Detection API: {error_status} - {error_message}")


def detect_faces_on_image(image_bytes: bytes, API_KEY: str = None) -> list:
    """
    Detect faces on image
    :param API_KEY: API Key for Google Cloud Platform
    :param image_bytes: image as bytes
    :return:
    """
    # Call Google Cloud Platform Face Detection API
    api_response = call_face_detection_gcp_api(image_bytes, API_KEY)

    # Check if API response is empty
    if not api_response:
        print("No faces found")
        return []  # return empty list

    # Create list to store faces
    faces = []
    for json_entity in api_response:
        face = {
            "bounding_box": json_entity["boundingPoly"],
            "is_happy": json_entity["joyLikelihood"] in ["VERY_LIKELY", "LIKELY"],
        }
        faces.append(face)
    return faces


def main():
    try:
        image_path = input("Please provide the path of the image:")
        if image_path == "" or not os.path.exists(image_path):
            print("image path could not be empty or the image does not exist")
            exit()

        image = read_image(image_path)
        # to get the API key go to GCP documentation
        faces = detect_faces_on_image(image, API_KEY="<GCP API KEY>")
        print("number of faces found:", len(faces))
        for face in faces:
            print(face["is_happy"])
    except Exception as e:
        print(f"Error running the script: {e}")


if __name__ == "__main__":
    main()