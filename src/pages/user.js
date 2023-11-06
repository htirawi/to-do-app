import UsersList from "../client/components/Users/UsersList";


const UsersPage = () => {
  return (
    <div>
      <h1>Users</h1>
      <p>This page is only accessible by authenticated users.</p>
      <UsersList />
    </div>
  );
};
export default UsersPage;
