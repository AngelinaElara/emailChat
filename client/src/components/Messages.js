import Table from 'react-bootstrap/Table'
import Accordion from 'react-bootstrap/Accordion'

const Messages = ({data}) => {

  return (
      <Table className='border rounded shadow-lg p-5'>
        <thead>
          <tr>
            <th>Message from</th>
            <th>Message subject</th>
            <th>Date</th>
          </tr>
        </thead>
      {data?.map((msg, index) => {
        return (
            <tbody key={index}>
              <tr>
                <th style={{fontWeight: '400'}}>{msg.sender}</th>
                <th style={{fontWeight: '500'}}>
                <Accordion className='accordion-flush' style={{width: '600px'}}>
                  <Accordion.Item eventKey={index}>
                  <Accordion.Header>{msg.header}</Accordion.Header>
                      <Accordion.Body >
                        {msg.text}
                      </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                </th>
                <th style={{fontWeight: '400'}}>{msg.date.slice(0, 10)} {msg.date.slice(11, 19)}</th>
              </tr>
            </tbody>
        )})}
        </Table>
  )
}
 
export default Messages