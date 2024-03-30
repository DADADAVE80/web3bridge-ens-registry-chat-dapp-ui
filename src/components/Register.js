import { Camera } from "lucide-react";
import { useRef, useState, useContext } from 'react';
import { registerName } from '../eth/register';
import { EthereumContext } from "../eth/context";
import { toast } from 'react-toastify';
import './Register.css';
import React from 'react';

function Register() {
  const nameInput = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const { registry, provider } = useContext(EthereumContext);
  const [selectedFile, setSelectedFile] = useState();

  const sendTx = async (event) => {
    event.preventDefault();
    const name = nameInput.current.value;
    setSubmitting(true);

    try {
      const response = await registerName(registry, provider, name);
      const hash = response.hash;
      const onClick = hash
        ? () => window.open(`https://sepolia.etherscan.io/tx/${hash}`)
        : undefined;
      toast('Transaction sent!', { type: 'info', onClick });
      nameInput.current.value = '';
    } catch (err) {
      toast(err.message || err, { type: 'error' });
    } finally {
      setSubmitting(false);
    }
  }

  const handleSelectImage = ({ target }) => {
    setSelectedFile(target.files[0]);
  };

  return (
    <div className="Container">
      <div className="Register">
        <input
          type="file"
          accept="image/*"
          hidden
          className="hidden"
          id="selectFile"
          onChange={handleSelectImage}
        />
        <label
          htmlFor="selectFile"
          className="rounded-full w-32 h-32 bg-secondary flex items-center justify-center cursor-pointer">
          {selectedFile ? (
            <img
              src={URL.createObjectURL(selectedFile)}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <Camera className="w-16 h-16 text-muted-foreground" />
          )}
          <p>Upload image</p>
        </label>
        <form onSubmit={sendTx}>
          <input required={true} placeholder="Username" ref={nameInput}></input>
          <button type="submit" disabled={submitting}>{submitting ? 'Registering...' : 'Register'}</button>
        </form>
      </div>

      <h1 className="or-separator">OR</h1>

      <div className="Login">
        <form onSubmit={sendTx}>
          <input required={true} placeholder="Username" ref={nameInput}></input>
          <button type="submit" disabled={submitting}>{submitting ? 'Logging in...' : 'Login'}</button>
        </form>
      </div>
    </div>
  );
}

export default Register;