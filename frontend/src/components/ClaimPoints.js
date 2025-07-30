import React from 'react';

function ClaimPoints({ users, selectedUserId, setSelectedUserId, claimPoints }) {
    return (
        <div className="d-flex justify-content-center gap-3 mb-4">
            <select
                className="form-select w-auto"
                onChange={(e) => setSelectedUserId(e.target.value)}
                value={selectedUserId}
            >
                <option value="">Select User</option>
                {users.map(user => (
                    <option key={user._id} value={user._id}>{user.name}</option>
                ))}
            </select>
            <button onClick={claimPoints} className="btn btn-warning shadow">Claim</button>
        </div>
    );
}

export default ClaimPoints;
