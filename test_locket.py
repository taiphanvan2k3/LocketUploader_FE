import requests
import json
from datetime import datetime


class Constants:
    loginUrl = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCQngaaXQIfJaH0aS2l7REgIjD7nL431So"
    loginHeader = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en",
        "baggage": "sentry-environment=production,sentry-public_key=78fa64317f434fd89d9cc728dd168f50,sentry-release=com.locket.Locket@1.82.0+3,sentry-trace_id=90310ccc8ddd4d059b83321054b6245b",
        "Connection": "keep-alive",
        "Content-Length": "117",
        "Content-Type": "application/json",
        "Host": "www.googleapis.com",
        "sentry-trace": "90310ccc8ddd4d059b83321054b6245b-3a4920b34e94401d-0",
        "User-Agent": "FirebaseAuth.iOS/10.23.1 com.locket.Locket/1.82.0 iPhone/18.0 hw/iPhone12_1",
        "X-Client-Version": "iOS/FirebaseSDK/10.23.1/FirebaseCore-iOS",
        "X-Firebase-AppCheck": "eyJraWQiOiJNbjVDS1EiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxOjY0MTAyOTA3NjA4Mzppb3M6Y2M4ZWI0NjI5MGQ2OWIyMzRmYTYwNiIsImF1ZCI6WyJwcm9qZWN0c1wvNjQxMDI5MDc2MDgzIiwicHJvamVjdHNcL2xvY2tldC00MjUyYSJdLCJwcm92aWRlciI6ImRldmljZV9jaGVja19kZXZpY2VfaWRlbnRpZmljYXRpb24iLCJpc3MiOiJodHRwczpcL1wvZmlyZWJhc2VhcHBjaGVjay5nb29nbGVhcGlzLmNvbVwvNjQxMDI5MDc2MDgzIiwiZXhwIjoxNzIyMTY3ODk4LCJpYXQiOjE3MjIxNjQyOTgsImp0aSI6ImlHUGlsT1dDZGg4Mll3UTJXRC1neEpXeWY5TU9RRFhHcU5OR3AzTjFmRGcifQ.lqTOJfdoYLpZwYeeXtRliCdkVT7HMd7_Lj-d44BNTGuxSYPIa9yVAR4upu3vbZSh9mVHYS8kJGYtMqjP-L6YXsk_qsV_gzKC2IhVAV6KbPDRHdevMfBC6fRiOSVn7vt749GVFdZqAuDCXhCILsaMhvgDBgZoDilgAPtpNwyjz-VtRB7OdOUbuKTCqdoSOX0SJWVUMyuI8nH0-unY--YRctunK8JHZDxBaM_ahVggYPWBCpzxq9Yeq8VSPhadG_tGNaADStYPaeeUkZ7DajwWqH5ze6ESpuFNgAigwPxCM735_ZiPeD7zHYwppQA9uqTWszK9v9OvWtFCsgCEe22O8awbNbuEBTKJpDQ8xvZe8iEYyhfUPncER3S-b1CmuXR7tFCdTgQe5j7NGWjFvN_CnL7D2nudLwxWlpqwASCHvHyi8HBaJ5GpgriTLXAAinY48RukRDBi9HwEzpRecELX05KTD2lTOfQCjKyGpfG2VUHP5Xm36YbA3iqTDoDXWMvV",
        "X-Firebase-GMPID": "1:641029076083:ios:cc8eb46290d69b234fa606",
        "X-Ios-Bundle-Identifier": "com.locket.Locket",
    }
    uploaderHeader = {
        "content-type": "application/octet-stream",
        "x-goog-upload-protocol": "resumable",
        "x-goog-upload-offset": "0",
        "x-goog-upload-command": "upload, finalize",
        "upload-incomplete": "?0",
        "upload-draft-interop-version": "3",
        "user-agent": "com.locket.Locket/1.43.1 iPhone/17.3 hw/iPhone15_3 (GTMSUF/1)",
    }


class UserProfile:
    def __init__(self, data):
        self.name = data.get("displayName")
        self.email = data.get("email")
        self.local_id = data.get("localId")
        self.id_token = data.get("idToken")
        self.registered = data.get("registered")
        self.profile_picture = data.get("profilePicture")
        self.refresh_token = data.get("refreshToken")
        self.expires_in = data.get("expiresIn")

    @classmethod
    def from_json(cls, data):
        return cls(data)

    def __str__(self):
        return (
            f"UserProfile(name={self.name}, email={self.email}, local_id={self.local_id}, "
            f"id_token={self.id_token[:20]}..., registered={self.registered}, "
            f"profile_picture={self.profile_picture}, refresh_token={self.refresh_token}, "
            f"expires_in={self.expires_in})"
        )

    def __repr__(self):
        return self.__str__()


def login(email, password):
    try:
        request_data = {
            "email": email,
            "password": password,
            "clientType": "CLIENT_TYPE_IOS",
            "returnSecureToken": True,
        }

        response = requests.post(
            Constants.loginUrl,
            data=json.dumps(request_data),
            headers=Constants.loginHeader,
        )

        if response.status_code == 200:
            user_profile = UserProfile.from_json(response.json())
            return user_profile
        else:
            raise Exception(f"Login failed: {response.reason}")
    except Exception as error:
        print(f"Error in login: {error}")
        raise


def upload_image_to_firebase_storage(id_user, id_token, image_data):
    try:
        name_img = f"{int(datetime.now().timestamp() * 1000)}_vtd182.webp"
        image_size = len(image_data)

        url = f"https://firebasestorage.googleapis.com/v0/b/locket-img/o/users%2F{id_user}%2Fmoments%2Fthumbnails%2F{name_img}?uploadType=resumable&name=users%2F{id_user}%2Fmoments%2Fthumbnails%2F{name_img}"

        headers = {
            "content-type": "application/json; charset=UTF-8",
            "authorization": f"Bearer {id_token}",
            "x-goog-upload-protocol": "resumable",
            "accept": "*/*",
            "x-goog-upload-command": "start",
            "x-goog-upload-content-length": str(image_size),
            "accept-language": "vi-VN,vi;q=0.9",
            "x-firebase-storage-version": "ios/10.13.0",
            "user-agent": "com.locket.Locket/1.43.1 iPhone/17.3 hw/iPhone15_3 (GTMSUF/1)",
            "x-goog-upload-content-type": "image/webp",
            "x-firebase-gmpid": "1:641029076083:ios:cc8eb46290d69b234fa609",
        }

        data = json.dumps(
            {
                "name": f"users/{id_user}/moments/thumbnails/{name_img}",
                "contentType": "image/*",
                "bucket": "",
                "metadata": {"creator": id_user, "visibility": "private"},
            }
        )

        response = requests.post(url, headers=headers, data=data)
        response.raise_for_status()

        upload_url = response.headers["X-Goog-Upload-URL"]

        upload_response = requests.put(
            upload_url, headers=Constants.uploaderHeader, data=image_data
        )
        upload_response.raise_for_status()

        get_url = f"https://firebasestorage.googleapis.com/v0/b/locket-img/o/users%2F{id_user}%2Fmoments%2Fthumbnails%2F{name_img}"
        get_headers = {
            "content-type": "application/json; charset=UTF-8",
            "authorization": f"Bearer {id_token}",
        }
        get_response = requests.get(get_url, headers=get_headers)
        get_response.raise_for_status()

        download_token = get_response.json()["downloadTokens"]

        return f"{get_url}?alt=media&token={download_token}"

    except Exception as e:
        print(f"Error during image upload: {e}")
        return None


def post_image(id_token, thumbnail_url, caption):
    try:
        post_headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {id_token}",
        }

        post_data = json.dumps(
            {
                "data": {
                    "thumbnail_url": thumbnail_url,
                    "caption": caption,
                    "sent_to_all": True,
                }
            }
        )

        response = requests.post(
            "https://api.locketcamera.com/postMomentV2",
            headers=post_headers,
            data=post_data,
        )

        return response.status_code == 200

    except Exception as error:
        print(f"Error in post_image: {error}")
        return False


# Example usage
if __name__ == "__main__":
    email = "taiphanvan2403@gmail.com"  # Replace with your email
    password = "taiphan@2403abc"  # Replace with your password

    try:
        # Step 1: Login and get the user profile
        user = login(email, password)
        print("Login successful:", user)

        # Step 2: Upload image to Firebase Storage
        image_path = "test.jpg"  # Replace with your image path
        with open(image_path, "rb") as image_file:
            image_data = image_file.read()

        download_url = upload_image_to_firebase_storage(
            user.local_id, user.id_token, image_data
        )
        if download_url:
            print("Image uploaded successfully. Download URL:", download_url)

            # Step 3: Post the image
            caption = "Unihack 2024"  # Replace with your image caption
            success = post_image(user.id_token, download_url, caption)
            print("Image posted successfully:", success)
        else:
            print("Image upload failed.")

    except Exception as e:
        print(f"An error occurred: {e}")
