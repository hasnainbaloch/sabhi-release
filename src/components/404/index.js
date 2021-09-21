import { Result, Button } from 'antd';
import { useHistory } from 'react-router';

const Comp_404 = ()=>
{
   const history = useHistory();

   return <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button onClick={()=> history.goBack()} type="primary">Back Home</Button>}
  />

}


export default Comp_404;