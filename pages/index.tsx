import React, { ReactEventHandler } from "react"
import { Container } from "@mui/system"
import { Button, Link} from "@mui/material";
import { useTable } from "../src/contexts/useTable"
import Layout from "../src/Shared/Layout"
import TableBody from "../src/Shared/Table/TableBody"
import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import { SampleColumns } from "../src/Helpers/SampleColumns"
import {DataFieldType, GenericObjectKeyType} from "../src/Helpers/TypeHelpers"

const Columns: DataFieldType[] = [
  {field: 'id', display: 'ID', showFilter: true},
  {field: 'sample_type', display: 'Sample Type', showFilter: true},
  {field: 'internal_id', display: 'Internal  ID', showFilter: true},
  {field: 'external_id', display: 'External  ID', showFilter: false},
]

const Home = ({samples}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { setLoading } = useTable()
  // const [data, setData] = React.useState(samples)
  const [tableState, setTableState] = React.useState(
    {
      dialogOpen: false,
      createSampleModalOpen: false,
      sampleQuantity: 1,
      samples: [] as GenericObjectKeyType[],
      contextMenuOpen: false,
      targetIndex: 0,
      mouseCoordinates: {x: 0, y: 0}
    }
  )

  // React.useEffect(() => {
  //   setTableState({...tableState, samples: Array(tableState.sampleQuantity).fill(0).map(x => {
  //     return {client_document: "", client_name: "", client_email: "", date_received: "", received_by: "", date_collected: "", vol_mass: "", unit: "", analysis: ""}
  //   })})
  // }, [tableState.sampleQuantity])

  // React.useEffect(() => {
  //   console.log(tableState.samples)
  // }, [tableState.samples])

  function handleSampleQuantityDialog(shouldOpenSampleModal?: boolean)
  {
    if(shouldOpenSampleModal){
      setTableState({
        ...tableState,
        dialogOpen: !tableState.dialogOpen,
        createSampleModalOpen: !tableState.createSampleModalOpen,
        samples: Array(tableState.sampleQuantity).fill(0).map(x => {
          return {client_document: "", client_name: "", client_email: "", date_received: "", received_by: "", date_collected: "", vol_mass: "", unit: "", analysis: ""}
        })
      })
    } else {
      setTableState({...tableState, dialogOpen: !tableState.dialogOpen})
    }
  }

  // function handleModalSample()
  // {
  //   setTableState({...tableState, createSampleModalOpen: !tableState.createSampleModalOpen})
  // }

  // function inputHandler(e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)
  // {
  //   setTableState({...tableState, sampleQuantity: Number(e.currentTarget.value)})
  // }

  // function handleContextMenu()
  // {
  //   setTableState({...tableState, contextMenuOpen: !tableState.contextMenuOpen})
  // }

  // function onContextMenu(event: React.MouseEvent, index: number)
  // {
  //   event.preventDefault()
  //   //@ts-ignore-next-line
  //   ref.current = event.target
  //   setTableState({
  //     ...tableState,
  //     contextMenuOpen: !tableState.contextMenuOpen,
  //     targetIndex: index,
  //     mouseCoordinates: {
  //       x: event.pageX,
  //       y: event.pageY
  //     }
  //   })
  // }

  // function fillDown()
  // {
  //   setTableState(
  //     {
  //       ...tableState,
  //       samples: tableState.samples.map((x, key) => {
  //         if (key > tableState.targetIndex) {
  //           //@ts-ignore
  //           x[ref.current.name] = ref.current.value
  //         }

  //         return x
  //       })
  //     }
  //   )
  // }

  // function updateItemSample(item: GenericObjectKeyType, index: number)
  // {
  //   setTableState(
  //     {
  //       ...tableState,
  //       samples: tableState.samples.map((objectVal, indexKey) => {
  //         return indexKey === index ? item : objectVal
  //       })
  //     }
  //   )
  // }

  // function removeItem(index: number)
  // {
  //   setTableState({
  //     ...tableState,
  //     samples: tableState.samples.filter((item, keyIndex) => {
  //       return index !== keyIndex
  //     })
  //   })
  // }

  return (
    <Layout>
      <>
      <Container maxWidth="xl" sx={{height: "100%", padding: "1rem 0"}}>
        <div style={{margin: ".2rem 1rem"}}>
          <Button LinkComponent={Link} href="/samples/create" color="generalButton" variant="contained">Create sample</Button>
        </div>
        <TableBody key={"table"} header={Columns} entity={new SampleColumns()} searchable sortable showCheckbox rowData={samples}/>
        </Container>
      </>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.REACT_APP_URL_API}/v1/sample`, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_TOKEN_API}`
    }
  })

  const data = await res.json()

  return {
    props: {
      samples: data
    }
  }
}

export default Home