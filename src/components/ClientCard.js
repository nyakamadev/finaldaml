import React from 'react';
import mg4Image from '../assets/mel.jpg'; // Import the local image

const ClientCard = () => {
  return (
    <div style={{ 
      padding: '4rem 2rem', // Original desktop padding
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ 
        display: 'flex',
        gap: '3rem',
        flexWrap: 'wrap',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        padding: '3rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '100%' // Prevent overflow on large screens
      }}>
        {/* Left Image Container */}
        <div style={{ 
          flex: 1,
          minWidth: '300px',
          height: '400px',
          background: `url(${mg4Image}) center/cover no-repeat`, // Use the imported image
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }} />

        {/* Right Text Content */}
        <div style={{ 
          flex: 1,
          minWidth: '300px',
          paddingLeft: '2rem'
        }}>
          <h2 style={{ 
            fontSize: '2.5rem',
            color: '#333',
            marginBottom: '1.5rem',
            lineHeight: '1.2',
            fontWeight: '600'
          }}>
            Already a<br />
            <span style={{ color: '#FFDB58' }}>client?</span>
          </h2>
          
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ 
              fontSize: '1.25rem',
              color: '#444',
              marginBottom: '1rem',
              fontWeight: '500'
            }}>
              Make Payments using Airtel Money any time 24/7
            </p>
            
            <p style={{ 
              fontSize: '1rem',
              color: '#666',
              lineHeight: '1.6',
              marginBottom: '1rem'
            }}>
              Follow the steps Below<br />
              Dial <strong>*115#</strong> Select Option <br/> 4 <strong>'Make payment'</strong>
              <br /> Then option 6 <strong>'Goods and Services'</strong>  
              <br/>Next Option 1 <strong>'Enter Merchant Code'</strong>
              <br/> Enter: <strong>DIRECTAML</strong> as 'Merchant Code'
              <br/> Enter: <strong>Amount to pay</strong>
              <br/> Enter: <strong>Your NRC No. eg. 421345/88/1 and Branch name eg Mbala</strong> <br/>
              Are you Stuck??  <br/>Call us <strong>+260777518123</strong>
            </p>
          </div>

          <button style={{ 
            backgroundColor: '#FFDB58',
            color: 'white',
            padding: '12px 30px',
            borderRadius: '25px',
            border: 'none',
            fontSize: '1rem',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s ease',
            ':hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 5px 15px rgba(221, 50, 39, 0.3)'
            }
          }}>
            Contact us
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;