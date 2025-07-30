import React from 'react';
import './TopThreeUsers.css';

function TopThreeUsers({ topThree }) {
    if (!topThree.length) return null;

    const ranks = [
        { pos: 2, className: 'order-1', size: '80px', border: 'secondary' },
        { pos: 1, className: 'order-2', size: '100px', border: 'warning' },
        { pos: 3, className: 'order-3', size: '80px', border: 'secondary' }
    ];

    return (
        <div className="top-three-wrapper text-center mb-5">
            <h4 className="mb-4 text-dark fw-bold">👑 Top 3 Champions</h4>
            <div className="row justify-content-center align-items-end g-3">
                {ranks.map(({ pos, className, size, border }) => {
                    const user = topThree[pos - 1];
                    if (!user) return null;

                    return (
                        <div key={user._id} className={`col-md-4 col-sm-6 ${className} top-three-user`}>
                            <div className={`card border-${border} shadow-lg`}>
                                <div className="card-body py-3">
                                    <div style={{ fontSize: '2rem' }}>👑</div>
                                    <div
                                        className="rounded-circle mx-auto my-2"
                                        style={{
                                            height: size,
                                            width: size,
                                            backgroundColor: '#eee',
                                            backgroundImage: `url(${user.avatar || ''})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    />
                                    <h6 className="fw-bold">{user.name}</h6>
                                    <div className="text-muted">{user.totalPoints} 💰</div>
                                    <span className="badge bg-dark mt-1">#{pos}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default TopThreeUsers;
