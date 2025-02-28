import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
} from "@nextui-org/react";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

function Registrations({ registeredUsers = [] }) {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "fullname":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: `${import.meta.env.VITE_SERVER_IMAGES}/${user.profile}`,
            }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      default:
        return cellValue;
    }
  }, []);

  const columns = [
    { uid: "fullname", name: "Name" },
    { uid: "phoneNumber", name: "Contact" },
    { uid: "city", name: "City" },
    { uid: "state", name: "State" },
    { uid: "college", name: "College" },
  ];

  return (
    <div className="p-4 lg:px-24 mt-5 min-h-96">
      <h1 className="mb-5 text-3xl text-fuchsia-600 font-medium">Registrations</h1>

      <Table aria-label="Registered Users">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={registeredUsers} emptyContent={"No registered users."}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default Registrations;
