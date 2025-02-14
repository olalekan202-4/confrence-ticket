
import { useState } from 'react';
import TicketSelection from './TicketSelection';
import UserDetailsForm from './form';
import Ticket from './ticket';
import { v4 as uuidv4 } from 'uuid';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Nav from './header'

const App = () => {
  const [step, setStep] = useState(1); // 1: Ticket Selection, 2: User Details, 3: Confirmation
  const [ticketDetails, setTicketDetails] = useState({ ticketType: '', numberOfTickets: 1 });
  const [userDetails, setUserDetails] = useState({ name: '', email: '', image: null });
  const [tickets, setTickets] = useState([]);
  const [isBooked, setIsBooked] = useState(false); // Track if the ticket is booked

  const handleSelectTicket = ({ ticketType, numberOfTickets }) => {
    setTicketDetails({ ticketType, numberOfTickets });
    setStep(2); // Move to the user details form
  };

  const handleSubmitUserDetails = ({ name, email, image }) => {
    setUserDetails({ name, email, image });

    // Generate tickets
    const newTickets = Array.from({ length: ticketDetails.numberOfTickets }, () => ({
      ticketType: ticketDetails.ticketType,
      ticketId: uuidv4(), // Generate a unique ticket ID
    }));
    setTickets(newTickets);

    setIsBooked(true); 
    setStep(3);
  };

  const handleBack = () => {
    setStep(1); // Go back to ticket selection
  };

  const handleDownloadTicket = () => {
    const ticketElement = document.querySelector('.ticket');

    if (ticketElement) {
      html2canvas(ticketElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');

        // Option 1: Download as Image
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'conference_ticket.png'; // File name for download
        document.body.appendChild(link);
        link.click(); // Trigger the download
        document.body.removeChild(link); // Clean up
        const pdf = new jsPDF();
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('conference_ticket.pdf'); // Save as PDF
      }).catch((error) => {
        console.error('Error capturing ticket:', error);
      });
    } else {
      console.error('Ticket element not found.');
    }
  };

  return (
    <div className="App">
      <Nav />
      <div className = "app-container">
        <div className= "ticket-selection1">
          <div className="ticket1">Ticket Selection</div>
          <div>Step {step}/3</div>
        </div>
        <div className="line-bar"></div>
        <div className="app-container2">
          <div className="teche">Techember Fest"25</div>
          <div className="teche-info">Join us fo an unforgettable experience at <br />[Event Name]!Secure your spot now.</div>
          <div className="teche-info"> 📍 [Event Location] | | March 15, 2025 | 7:00 PM </div>
        </div>
        <hr />
        <div>
              {step === 1 && <TicketSelection onSelectTicket={handleSelectTicket} />}
              {step === 2 && (
              <UserDetailsForm
                onSubmit={handleSubmitUserDetails}
                onBack={handleBack}
              />
              )}
              {step === 3 && (
              <div>
                {isBooked && (
                  <div className="confirmation-message">
                    <h2>Your ticket is booked!</h2>
                    <p>Check your email for a copy, or you can download it below.</p>
                    <button onClick={handleDownloadTicket}>Download Ticket</button>
                    <button onClick={() => setStep(1)}>Book Another Ticket</button>
                  </div>
                )}
                {tickets.map((ticket, index) => (
                  <Ticket
                    key={index}
                    name={userDetails.name}
                    email={userDetails.email}
                    image={userDetails.image ? URL.createObjectURL(userDetails.image) : ''}
                    ticketType={ticket.ticketType}
                    ticketId={ticket.ticketId}
                  />
                ))}
            </div>
          )}
          
        </div>
        
      </div>
      
    </div>
  );
};

export default App;