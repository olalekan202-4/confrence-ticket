import { useState, useEffect } from 'react';
import TicketSelection from './TicketSelection';
import UserDetailsForm from './form';
import Ticket from './ticket';
import { v4 as uuidv4 } from 'uuid';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Header from './header';

const App = () => {
  // Load data from localStorage on initial render
  const [step, setStep] = useState(() => {
    const savedStep = localStorage.getItem('step');
    return savedStep ? parseInt(savedStep, 10) : 1;
  });

  const [ticketDetails, setTicketDetails] = useState(() => {
    const savedTicketDetails = localStorage.getItem('ticketDetails');
    return savedTicketDetails ? JSON.parse(savedTicketDetails) : { ticketType: '', numberOfTickets: 1 };
  });

  const [userDetails, setUserDetails] = useState(() => {
    const savedUserDetails = localStorage.getItem('userDetails');
    return savedUserDetails ? JSON.parse(savedUserDetails) : { name: '', email: '', image: null };
  });

  const [tickets, setTickets] = useState(() => {
    const savedTickets = localStorage.getItem('tickets');
    return savedTickets ? JSON.parse(savedTickets) : [];
  });

  const [isBooked, setIsBooked] = useState(() => {
    const savedIsBooked = localStorage.getItem('isBooked');
    return savedIsBooked ? JSON.parse(savedIsBooked) : false;
  });

  
  useEffect(() => {
    localStorage.setItem('step', step);
  }, [step]);

  useEffect(() => {
    localStorage.setItem('ticketDetails', JSON.stringify(ticketDetails));
  }, [ticketDetails]);

  useEffect(() => {
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
  }, [userDetails]);

  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('isBooked', JSON.stringify(isBooked));
  }, [isBooked]);

  const handleSelectTicket = ({ ticketType, numberOfTickets }) => {
    setTicketDetails({ ticketType, numberOfTickets });
    setStep(2); 
  };

  const handleSubmitUserDetails = ({ name, email, image }) => {
    setUserDetails({ name, email, image });

    
    const newTickets = Array.from({ length: ticketDetails.numberOfTickets }, () => ({
      ticketType: ticketDetails.ticketType,
      ticketId: uuidv4(),
    }));
    setTickets(newTickets);

    setIsBooked(true);
    setStep(3); 
  };

  const handleBack = () => {
    setStep(1); //
  };

  const handleDownloadTicket = () => {
    const ticketElement = document.querySelector('.ticket');

    if (ticketElement) {
      html2canvas(ticketElement).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'conference_ticket.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        const pdf = new jsPDF();
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('conference_ticket.pdf');
      }).catch((error) => {
        console.error('Error capturing ticket:', error);
      });
    } else {
      console.error('Ticket element not found.');
    }
  };

  const handleMyTicketsClick = () => {
    setStep(1);
  };

  return (
    <div className="App">
      <Header onMyTicketsClick={handleMyTicketsClick} />
      <div className="app-container">
        <div className="ticket-selection1">
          <div className="ticket1">
            {step === 1 && "Ticket Selection"}
            {step === 2 && "Attendee Details"}
            {step === 3 && "Confirmation"}
          </div>
          <div>Step {step}/3</div>
        </div>
        <div className="line-bar"></div>
        <div className="app-container2">
          <div className="teche">Techember Fest"25</div>
          <div className="teche-info">Join us for an unforgettable experience at <br />[Event Name]! Secure your spot now.</div>
          <div className="teche-info"> 📍 [Event Location] | March 15, 2025 | 7:00 PM </div>
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
                  <div className="booked">Your ticket is Booked!</div>
                  <div>Check your email for a copy, or you can download it below.</div>
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

              <div className="button-group">
                <button onClick={handleDownloadTicket} className="back-button">Download Ticket</button>
                <button onClick={() => setStep(1)} className="back-button">Book Another Ticket</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;