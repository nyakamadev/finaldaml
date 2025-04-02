import React from 'react';
import styles from './NewsSection.module.css';
import mg3Image from '../assets/mg3.jpg';
import cont22Image from '../assets/cont22.jpg';

function NewsSection() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <h2 className={styles.title}>Get Updated</h2>

        <div className={styles.grid}>
          {/* Left Card */}
          <div className={styles.card}>
            <img src={mg3Image} alt="New Memorandum of Understanding" className={styles.image} />
            <h3 className={styles.cardTitle}>New Memorandum of Understanding</h3>
            <p className={styles.description}>
              Join our strong brand by signing an MOU with us Direct access financial services bene ba ma Direct 
              We recently signed with the FFTUZ Federation of free trade unions in Zambia, a mother board of unions.
              Is your union under FFTUZ you now qualify to have your members as our members.
              Direct access bene bama Direct......
            </p>
            <span className={styles.arrow}>→</span>
          </div>

          {/* Right Card */}
          <div className={styles.card}>
            <img src={cont22Image} alt="Cash Loans" className={styles.image} />
            <h3 className={styles.cardTitle}>Cash loans offer fast financial relief: Benefits you can't ignore</h3>
            <p className={styles.description}>
              Cash loans make life easy when there's a sudden financial emergency such as a 
              medical emergency, urgent home repairs, or...
            </p>
            <span className={styles.arrow}>→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsSection;