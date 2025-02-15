
const Ticket = ({ name, email, image, ticketType, ticketId }) => {
  return (
    <div className="ticket">
      <h2>Conference Ticket</h2>
      <img src={image} alt="User" style={{ width: '250px', height: '250px', borderRadius: '10%' }} />
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Ticket Type: {ticketType}</p>
      {/* <div className="barcode">
        <Barcode
          value={ticketId} // The ticket ID (number) to encode in the barcode
          displayValue={true} // Show the ticket ID number below the barcode
          width={2} // Adjust the width of the barcode
          height={50} // Adjust the height of the barcode
        />
      </div> */}
    </div>
  );
};

export default Ticket;