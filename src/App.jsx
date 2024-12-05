import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { signInAnonymously } from "firebase/auth";

import { auth, storage } from "../firebase.config";
import { ClipLoader } from "react-spinners";

const AudioUploadButton = () => {
  const [uploading, setUploading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  const handleUpload = async (event) => {
    try {
      setUploading(true);

      // Sign in anonymously first
      // await signInAnonymously(auth);

      const file = event.target.files[0];
      const audioRef = ref(storage, `audios/${Date.now()}-${file.name}`);

      const snapshot = await uploadBytes(audioRef, file);
      const url = await getDownloadURL(snapshot.ref);

      setAudioUrl(url);
      alert("Audio File Successfully Uploaded!");
    } catch (error) {
      alert(
        "Upload failed. Please try again and make sure it is proper audio file extension and make sure not to upload the same file twice."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-black flex flex-col gap-5 justify-center items-center">
      <h1 className="text-white font-semibold text-4xl">
        Welcome to our Voxify website
      </h1>
      <div className="flex flex-col items-center gap-4">
        <input
          type="file"
          accept="audio/*"
          onChange={handleUpload}
          className="hidden"
          id="audio-input"
          disabled={uploading}
        />
        <label
          htmlFor="audio-input"
          className={`px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 inline-block text-center ${
            uploading ? "cursor-not-allowed bg-gray-500" : ""
          }`}
        >
          {uploading ? "Uploading..." : "Upload Audio"}
        </label>
      </div>

      {uploading && (
        <ClipLoader
          color={"blue"}
          loading={uploading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}

      <p className="text-white text-sm">
        Press the button to upload your audio file to be processed.
      </p>
    </div>
  );
};

export default AudioUploadButton;
