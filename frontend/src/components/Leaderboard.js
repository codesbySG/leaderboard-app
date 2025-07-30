import React from 'react';

function Leaderboard({ users }) {
    const others = users.slice(3);
    return (
        <div className="card mx-auto shadow" style={{ maxWidth: "600px" }}>
            <div className="card-body">
                <h4 className="card-title mb-4">🏅 Full Rankings</h4>
                {others.map((user, index) => (
                    <div
                        key={user._id}
                        className="d-flex justify-content-between align-items-center px-3 py-2 mb-2 bg-light rounded"
                    >
                        <span>{index + 4}. {user.name}</span>
                        <span>{user.totalPoints} 💰</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Leaderboard;
