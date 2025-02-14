import { useState } from 'react';

const UserDetailsForm = ({ onSubmit, onBack }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [specialRequest, setSpecialRequest] = useState(''); // State for special request

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, image, specialRequest }); // Include specialRequest in the submission
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="user-details-form">
      <h2>Enter Your Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Upload Picture:
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </label>
        <label>
          Special Request:
          <textarea
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
            rows={4} // Number of visible rows
            placeholder="Enter any special requests or additional information..."
          />
        </label>
        <div className="button-group">
          <button type="button" onClick={onBack} className="back-button">
            Back
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDetailsForm;