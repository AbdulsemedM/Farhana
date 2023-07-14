import React, { useEffect, useState } from "react";
import { Button, Modal, Popup } from "semantic-ui-react";
import { API } from "../../utils/API";
import { PrintDetail } from "./PrintDetail";
import DetailToPrint from "./DetailToPrint";
import { connect } from "react-redux";
import { selectAccessToken } from "../../redux/user/userSelector";
import { createStructuredSelector } from "reselect";

function DetailModal({ row, users, access_token }) {
  const [user, setUser] = useState([]);
  const [orphan, setOrphan] = useState([]);
  useEffect(() => {
    setUser([]);
    setOrphan([]);
    const fetchData = async () => {
      users
        ? await API.get(`/message/getMessage/${row?._id}`, {
            headers: {
              access_token: access_token,
            },
          }).then((res) => setUser(res.data))
        : await API.get(`/orphan/getOrphan/${row?._id}`, {
            headers: {
              access_token: access_token,
            },
          }).then((res) => setOrphan(res.data));
    };
    fetchData();
  }, [users, access_token, row?._id]);
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      centered={false}
      open={open}
      size="large"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={
        <button>
          <Popup
            content="Details"
            trigger={
              <i className="file alternate outline outline-none teal icon"></i>
            }
          />
        </button>
      }
    >
      <Modal.Header>{row?.name ? row?.name : row?.fullName}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <DetailToPrint
            users={users}
            row={row}
            user={user}
            orphan={orphan}
            fromprint={false}
          />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions className="flex items-center justify-end">
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <PrintDetail users={users} row={row} user={user} orphan={orphan} />
      </Modal.Actions>
    </Modal>
  );
}

const mapStateToProps = createStructuredSelector({
  access_token: selectAccessToken,
});

export default connect(mapStateToProps)(DetailModal);
