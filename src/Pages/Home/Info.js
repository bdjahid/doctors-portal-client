import React from 'react';
import InfoCard from './InfoCard';
import clock from '../../assets/icons/clock.svg';
import marker from '../../assets/icons/marker.svg';
import phone from '../../assets/icons/phone.svg';
const Info = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 px-12'>
            <InfoCard bglass="bg-gradient-to-r from-secondary tp-primary  text-white font-bold" cardTitle="Opening ours" img={clock}></InfoCard>
            <InfoCard bglass="bg-gradient-to-r from-secondary" cardTitle="Our Locations" img={marker}></InfoCard>
            <InfoCard bglass="bg-gradient-to-r from-secondary tp-primary text-white font-bold" cardTitle="Contact Us" img={phone}></InfoCard>
        </div>
    );
};

export default Info;