import React, { useState, useEffect } from "react";
import { User } from "../types/user";
import { UserCheck, UserX, Plus, MoreHorizontal } from "lucide-react";
import { CreateUserModal } from "./CreateUserModal";
import { EditUserModal } from "./EditUserModal";
import { Loader } from "lucide-react"; // Example of a loading spinner from lucide-react

const URL = process.env.REACT_APP_BACKEND_URL;
const userData = JSON.parse(localStorage.getItem("musicUserData") || "{}");

export const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const { accessToken, name, email, isAdmin } = userData;

  useEffect(() => {
    const fetchUsers = async () => {
      if (!accessToken) {
        console.error("Token not found. Please log in again.");
        return;
      }

      setIsLoading(true); // Start loading
      try {
        const response = await fetch(`${URL}/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false); // End loading
      }
    };
    fetchUsers();
  }, []);

  const handleCreateUser = async (userData: {
    name: string;
    email: string;
    phoneNumber: string;
  }) => {
    try {
      if (!accessToken) {
        console.error("Token not found. Please log in again.");
        return;
      }

      setIsLoading(true); // Start loading
      const response = await fetch(`${URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const newUser = await response.json();
        setUsers((prevUsers) => [...prevUsers, newUser]);
        setShowCreateModal(false); // Close modal after successful creation
      } else {
        console.error("Failed to create user.");
      }
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handleEditUser = async (
    userId: string,
    userData: { name: string; email: string; phoneNumber: string }
  ) => {
    try {
      if (!accessToken) {
        console.error("Token not found. Please log in again.");
        return;
      }

      setIsLoading(true); // Start loading
      const response = await fetch(`${URL}/user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        // Update the users state with the new user data
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
        setEditingUser(null); // Close modal after successful update
      } else {
        console.error("Failed to edit user.");
      }
    } catch (error) {
      console.error("Error editing user:", error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <div className="m-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create New User
        </button>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
        {isLoading ? ( // Show loading spinner when fetching data
          <div className="flex justify-center items-center py-4">
            <Loader className="h-10 w-10 text-indigo-600 animate-spin" />
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {user.phoneNumber}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      {user.status === "active" ? (
                        <span className="flex items-center px-3 py-1 text-sm text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200">
                          <UserCheck className="w-4 h-4 mr-2" />
                          Active
                        </span>
                      ) : (
                        <span className="flex items-center px-3 py-1 text-sm text-red-800 bg-red-100 rounded-full dark:bg-red-900 dark:text-red-200">
                          <UserX className="w-4 h-4 mr-2" />
                          Inactive
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap text-sm">
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={() => setEditingUser(user)}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showCreateModal && (
        <CreateUserModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateUser}
        />
      )}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSubmit={handleEditUser}
        />
      )}
    </div>
  );
};