import { Button, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useTable } from "../contexts/useTable";
import { pluck } from "../Helpers/Functions";
import { GenericObjectKeyType } from "../Helpers/TypeHelpers";

const RunTest = () => {
  const { checkboxes } = useTable()
  const [ state, setState ] = React.useState({modalOpen: false})

  async function handleRunTest()
  {
    let samples = ''
    let sampleTypes: GenericObjectKeyType = []
    Object.entries(checkboxes).map((x) => {
      if (x[1] === true) {
        if(samples === '')
          samples += x[0]
        else
          samples += `,${x[0]}`
      }
    })

    let samplesSelected = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_URL_API}/v1/sample/findByIds/${samples}`).then(r => r.data).catch(e => console.log(e))
    //189,185
    samplesSelected.forEach((i: GenericObjectKeyType) => {
      if (!sampleTypes.includes(i["sample_type"]))
        sampleTypes.push(i["sample_type"])

      i["tests"].forEach((t: GenericObjectKeyType) => {
        console.log(t["analysis"])
      })
    })

    

    if (sampleTypes.length > 1)
      alert('Voce selecion tipos de amostra diferente')
  }

  function handleClose()
  {
    setState({
      modalOpen: !state.modalOpen
    })
  }

  return (
    <>
      <Button color="generalButton" onClick={handleRunTest} variant="contained">Run tests</Button>
      <Modal
        open={state.modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default RunTest