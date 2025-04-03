import React from 'react';
import mg4Image from '../assets/mel.jpg'; // Import the local image

const ClientCard = () => {
  return (
    <div className="flex justify-center p-8">
      <div className="flex flex-wrap items-center bg-white rounded-lg shadow-lg max-w-5xl p-6 md:p-12">
        {/* Left Image Container */}
        <div className="flex-1 min-w-[300px] h-[400px] bg-cover bg-center rounded-lg" style={{ backgroundImage: `url(${mg4Image})` }}></div>
        
        {/* Right Text Content */}
        <div className="flex-1 min-w-[300px] md:pl-8 mt-6 md:mt-0">
          <h2 className="text-4xl font-semibold text-gray-800 leading-tight mb-4">
            Already a <br /><span className="text-yellow-600">client?</span>
          </h2>
          
          <p className="text-lg text-gray-700 font-medium mb-4">
            Make Payments using Airtel Money any time 24/7
          </p>
          
          <p className="text-gray-600 text-base leading-relaxed">
            Follow the steps below:<br />
            Dial <strong>*115#</strong> and select Option <strong>4</strong> ('Make payment')<br />
            Then select Option <strong>6</strong> ('Goods and Services')<br />
            Next, select Option <strong>1</strong> ('Enter Merchant Code')<br />
            Enter: <strong>DIRECTAML</strong> as the Merchant Code<br />
            Enter: <strong>Amount to pay</strong><br />
            Enter: <strong>Your NRC No. (******/***) and Branch name (e.g., Mbala)</strong><br />
            <br />
            Are you stuck? Call us at <strong>+260777518123</strong>
          </p>
          
          <button className="mt-6 bg-yellow-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300">
            Contact us
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
