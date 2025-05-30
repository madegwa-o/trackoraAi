import styles from './DonationPage.module.css';
import { useWebSocket } from "../../hooks/WebSocketContext.jsx";
import { DonationCard } from './DonationCard.jsx';

export function DonationPage() {
    const { donorList } = useWebSocket();

    // Sort donors by amount (highest first)
    const sortedDonors = [...donorList].sort((a, b) => b.amount - a.amount);

    return (
        <div className={styles.donationPage}>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.donationSection}>
                        <DonationCard />
                    </div>

                    <div className={styles.donorListSection}>
                        <div className="card">
                            <h2>Donor List</h2>
                            {sortedDonors.length === 0 ? (
                                <p className={styles.emptyState}>No donations yet</p>
                            ) : (
                                <div className={styles.donorList}>
                                    {sortedDonors.map((donor, index) => (
                                        <div key={index} className={styles.donorItem}>
                                            <div className={styles.donorInfo}>
                                                <span className={styles.donorName}>
                                                    {donor.customer_name || 'Anonymous'}
                                                </span>
                                                <span className={styles.donorPhone}>
                                                    {donor.phone_number}
                                                </span>
                                            </div>
                                            <div className={styles.donorAmount}>
                                                ${donor.amount.toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}