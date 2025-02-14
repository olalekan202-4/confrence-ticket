import { useState } from 'react';

const TicketSelection = ({ onSelectTicket, onCancel }) => {
  const [ticketType, setTicketType] = useState('Regular');
  const [numberOfTickets, setNumberOfTickets] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSelectTicket({ ticketType, numberOfTickets });
  };

  const handleCancel = () => {
    // Reset the form or navigate back
    setTicketType('Regular');
    setNumberOfTickets(1);
    onCancel(); // Call the onCancel prop if provided
  };

  return (
    <div className="ticket-selection">
      <div className="ticket-type">Select Your Ticket:</div>
      <div className="ticket-options">
        <div
          className={`ticket-option ${ticketType === 'Regular' ? 'selected' : ''}`}
          onClick={() => setTicketType('Regular')}
          id="free-box"
        >
          <div className="free">Free</div>
          <div className="regular">REGULAR ACCESS <br />20/52</div>
        </div>
        <div
          className={`ticket-option ${ticketType === 'VIP' ? 'selected' : ''}`}
          onClick={() => setTicketType('VIP')}
          id="vip-box"
        >
          <div className="free">$150</div>
          <div className="regular">VIP ACCESS <br />20/52</div>
        </div>
        <div
          className={`ticket-option ${ticketType === 'VVIP' ? 'selected' : ''}`}
          onClick={() => setTicketType('VVIP')}
          id="vvip-box"
        >
          <div className="free">$200</div>
          <div className="regular">VVIP ACCESS <br />20/52</div>
        </div>
      </div>
      <div className="ticket-quantity">
        <label>
          Number of Tickets <br />
          <input
            type="number"
            value={numberOfTickets}
            onChange={(e) => setNumberOfTickets(e.target.value)}
            min="1"
          />
        </label>
      </div>
      <div className="button-group">
        <div className="cancel-button">
          <button type="button" onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        </div>
        <div className="next-button">
        <button type="submit" onClick={handleSubmit} className="next-button">
          Next
        </button>
        </div>
      </div>
    </div>
  );
};

export default TicketSelection;