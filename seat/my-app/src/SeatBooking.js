import React, { useState } from 'react';
import './Book.css';

const SeatBooking = () => {
    const [name, setName] = useState('');
    const [requiredSeats, setRequiredSeats] = useState('');
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalTickets, setTotalTickets] = useState('');
    const [seatNumbers, setSeatNumbers] = useState('');
    const [message, setMessage] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleRequiredSeatsChange = (event) => {
        setRequiredSeats(event.target.value);
    };

    const handleSeatSelection = (seatNumber) => {
        if (selectedSeats.length < Number(requiredSeats)) {
            if (!selectedSeats.includes(seatNumber)) {
                setSelectedSeats((prevSelectedSeats) => [...prevSelectedSeats, seatNumber]);
            } else {
                setSelectedSeats((prevSelectedSeats) =>
                    prevSelectedSeats.filter((seat) => seat !== seatNumber)
                );
            }
        }
    };

    const handleConfirm = () => {
        if (requiredSeats === selectedSeats.length.toString()) {
            setMessage(
                `Hi ${name}, you have selected ${requiredSeats} tickets. Your seat numbers are ${selectedSeats.join(', ')}.`
            );
        } else if (requiredSeats > selectedSeats.length) {
            setMessage(`Please select ${requiredSeats} seats.`);
        }
    };



    return (
        <div id="all">
            <h1>Seat Booking</h1>
            <br />
            <br />
            <form id="form1">
                <h3>
                    Name:
                    <input type="text" id="name" value={name} onChange={handleNameChange} />
                </h3>
                <br />
                <br />
                <h3>
                    Required Seats:
                    <input
                        type="number"
                        id="requiredSeats"
                        value={requiredSeats}
                        onChange={handleRequiredSeatsChange}
                    />
                    <br />
                    <br />
                </h3>
            </form>

            <div id="seats-container">
                {[...Array(20)].map((_, index) => (
                    <div
                        key={index + 1}
                        className={`book seat${index + 1} ${selectedSeats.includes((index + 1).toString()) ? 'selected' : ''}`}
                        onClick={() => handleSeatSelection((index + 1).toString())}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
            <br />
            <br />
            <br />
            <button id="confirmBtn" onClick={handleConfirm}>
                Confirm
            </button>
            <br />
            <br />

            <form id="form2">
                <h3>
                    Total Tickets: <input type="text" id="num" value={selectedSeats.length} readOnly />
                </h3>
                <br />
                <br />
                <h3>
                    Selected Seat Numbers: <input type="text" id="para" value={selectedSeats.join(', ')} readOnly />
                </h3>
                <br />
                <br />
                <h3 id="final">{message}</h3>
            </form>
        </div>
    );
};

export default SeatBooking;
