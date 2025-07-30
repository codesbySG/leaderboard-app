import React from 'react';

function AddUserForm({ newUserName, setNewUserName, addUser }) {
    return (
        <div className="d-flex justify-content-center gap-3 mb-4">
            <input
                type="text"
                className="form-control w-auto"
                placeholder="Enter name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
            />
            <button onClick={addUser} className="btn btn-success">Add User</button>
        </div>
    );
}

export default AddUserForm;
