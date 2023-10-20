## API Documentation

### API Base URL

`http://[YOUR_SERVER_IP]:8080`

---

### 1. Encode Endpoint

Encodes a given text to a `.wav` file based on the `protocolId` and `volume` provided. If not specified, it uses default values for them.

**URL**: `/encode`

**Method**: `POST`

**Data Params**:

- **text** *(required)*: The text to encode.
- **protocolId** *(optional)*: The protocol ID to use for encoding. Defaults to `5`.
  - **Available protocols**:
    - 0  - Normal
    - 1  - Fast
    - 2  - Fastest
    - 3  - [U] Normal
    - 4  - [U] Fast
    - 5  - [U] Fastest
    - 6  - [DT] Normal
    - 7  - [DT] Fast
    - 8  - [DT] Fastest
    - 9  - [MT] Normal
    - 10 - [MT] Fast
    - 11 - [MT] Fastest
- **volume** *(optional)*: The volume level for encoding. Defaults to `10`.

**Success Response**:

- **Code**: 200
- **Content**: A `.wav` file with the encoded audio.

**Error Response**:

- **Code**: 500
- **Content**: Error message.

**Sample Call**:

```python
import requests

response = requests.post('http://[YOUR_SERVER_IP]:8080/encode', data={
    'text': 'hello world',
    'protocolId': 3,
    'volume': 7
})

# Save the returned audio file
with open('encoded_audio.wav', 'wb') as f:
    f.write(response.content)
```

---

### 2. Decode Endpoint

Decodes a given `.wav` file and returns the extracted text.

**URL**: `/decode`

**Method**: `POST`

**Data Params**:

- **file** *(required)*: A `.wav` file to decode.

**Success Response**:

- **Code**: 200
- **Content**: `{"text": "decoded text"}`

**Error Response**:

- **Code**: 400
- **Content**: `"Failed to decode"`

- **Code**: 500
- **Content**: Error message.

**Sample Call**:

```python
import requests

with open('encoded_audio.wav', 'rb') as f:
    response = requests.post('http://[YOUR_SERVER_IP]:8080/decode', files={'file': f})

print(response.json())
```