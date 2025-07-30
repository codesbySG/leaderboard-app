import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddUserForm from './components/AddUserForm';
import ClaimPoints from './components/ClaimPoints';
import TopThreeUsers from './components/TopThreeUsers';
import Leaderboard from './components/Leaderboard';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [lastClaim, setLastClaim] = useState(null);
  const [newUserName, setNewUserName] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3002/api/users");
    setUsers(res.data);
  };

  const claimPoints = async () => {
    if (!selectedUserId) return;
    const res = await axios.post(`http://localhost:3002/api/users/claim/${selectedUserId}`);
    setLastClaim(res.data);
    fetchUsers();
  };

  const addUser = async () => {
    if (!newUserName.trim()) return;
    await axios.post("http://localhost:3002/api/users/add", { name: newUserName });
    setNewUserName("");
    fetchUsers();
  };

  const topThree = users.slice(0, 3);

  return (
    <div className="min-vh-100 bg-warning bg-opacity-25 py-5 px-3">
      <div className="container">
        <h1 className="text-center mb-5 fw-bold">🏆 Wealth Leaderboard</h1>

        <AddUserForm
          newUserName={newUserName}
          setNewUserName={setNewUserName}
          addUser={addUser}
        />

        <ClaimPoints
          users={users}
          selectedUserId={selectedUserId}
          setSelectedUserId={setSelectedUserId}
          claimPoints={claimPoints}
        />

        {lastClaim && (
          <div className="alert alert-info text-center fade show mb-4" role="alert">
            <strong>{lastClaim.user.name}</strong> claimed <strong>{lastClaim.pointsClaimed}</strong> points! 🎉
          </div>
        )}


        <TopThreeUsers topThree={topThree} />
        <Leaderboard users={users} />
      </div>
    </div>
  );
}

export default App;

//qeGtGvFxMjrx0PEn
