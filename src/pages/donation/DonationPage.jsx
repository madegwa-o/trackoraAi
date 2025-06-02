import styles from './DonationPage.module.css';
import { DonationCard } from './DonationCard.jsx';
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance.jsx";

export function DonationPage() {
    const [donorList, setDonorList] = useState([]);

    const fetchDonors = async () => {
        try {
            const donorResponse = await axiosInstance.get('/donation/get-donors');
            console.log('donorResponse: ', donorResponse);

            // Ensure we handle the data correctly
            if (donorResponse.data && Array.isArray(donorResponse.data.donors)) {
                setDonorList(donorResponse.data.donors);
            } else {
                console.error('Invalid donor response format');
                setDonorList([]);
            }
        } catch (error) {
            console.error('Error fetching donors:', error);
            setDonorList([]);
        }
    };

    useEffect(() => {
        fetchDonors();
    }, []);

    // Sort donors by amount (highest first) and handle missing or undefined values
    const sortedDonors = [...donorList].sort((a, b) => (b.Amount || 0) - (a.Amount || 0));
    const totalDonations = donorList.reduce((sum, donor) => sum + (donor.Amount || 0), 0);
    const donorCount = donorList.length;

    return (
        <div className={styles.donationPage}>
            <div className="container">
                {/* Hero Section */}
                <div className={styles.heroSection}>
                    <h1 className={styles.heroTitle}>Make a Difference Today</h1>
                    <p className={styles.heroSubtitle}>
                        Your generosity creates lasting impact. Join our community of changemakers and help us build a better tomorrow.
                    </p>

                    {/* Impact Stats */}
                    <div className={styles.impactStats}>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>sh {totalDonations.toLocaleString()}</span>
                            <span className={styles.statLabel}>Total Raised</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>{donorCount}</span>
                            <span className={styles.statLabel}>Kind Hearts</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>100%</span>
                            <span className={styles.statLabel}>Goes to Cause</span>
                        </div>
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.donationSection}>
                        <DonationCard refreshDonorList={fetchDonors} />

                        {/* Trust Indicators */}
                        <div className={styles.trustIndicators}>
                            <div className={styles.trustItem}>
                                <span className={styles.trustIcon}>🔒</span>
                                <span className={styles.trustText}>Secure Payment</span>
                            </div>
                            <div className={styles.trustItem}>
                                <span className={styles.trustIcon}>📱</span>
                                <span className={styles.trustText}>Mobile Money</span>
                            </div>
                            <div className={styles.trustItem}>
                                <span className={styles.trustIcon}>⚡</span>
                                <span className={styles.trustText}>Instant Processing</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.donorListSection}>
                        <div className="card">
                            <div className={styles.donorListHeader}>
                                <h2>🌟 Wall of Kindness</h2>
                                <p className={styles.donorListSubtext}>
                                    Amazing people who are making a difference
                                </p>
                            </div>

                            {sortedDonors.length === 0 ? (
                                <div className={styles.emptyState}>
                                    <div className={styles.emptyIcon}>💫</div>
                                    <h3>Be the First Hero!</h3>
                                    <p>Start the movement and inspire others to follow your lead.</p>
                                </div>
                            ) : (
                                <div className={styles.donorList}>
                                    {sortedDonors.map((donor, index) => (
                                        <div key={index} className={`${styles.donorItem} ${index === 0 ? styles.topDonor : ''}`}>
                                            <div className={styles.donorInfo}>
                                                <div className={styles.donorHeader}>
                                                    {index === 0 && <span className={styles.crownIcon}>👑</span>}
                                                    <span className={styles.donorName}>
                                                        {donor.name || 'Anonymous Hero'}
                                                    </span>
                                                    {index < 3 && (
                                                        <span className={styles.badge}>
                                                            {index === 0 ? '🥇 Champion' : index === 1 ? '🥈 Supporter' : '🥉 Helper'}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={styles.donorAmount}>
                                                sh {donor.Amount?.toLocaleString() || '0'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Call to Action */}
                        {donorCount > 0 && (
                            <div className={styles.ctaCard}>
                                <h3>Join These Amazing People!</h3>
                                <p>Every donation, no matter the size, makes a real difference. Be part of something bigger.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}