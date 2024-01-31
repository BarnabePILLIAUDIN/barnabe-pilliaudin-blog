import UserRow from "@/web/components/adminDashboard/UserRow"

const UsersList = ({ users, fetchUsers, ...otherProps }) => (
  <div {...otherProps}>
    <table>
      <thead>
        <tr>
          <th></th>
          <th className="border-2 border-black p-2 bg-slate-400">First name</th>
          <th className="border-2 border-black p-2 bg-slate-400">Last name</th>
          <td className="border-2 border-black p-2 bg-slate-400"></td>
          <td className="border-2 border-black p-2 bg-slate-400"></td>
          <td className="border-2 border-black p-2 bg-slate-400"></td>
          <td className="border-2 border-black p-2 bg-slate-400"></td>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserRow key={user.id} user={user} fetchUsers={fetchUsers} />
        ))}
      </tbody>
    </table>
  </div>
)

export default UsersList
