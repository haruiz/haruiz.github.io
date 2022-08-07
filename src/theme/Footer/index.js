import React from 'react';
import {Box, Flex} from "rebass";
import SocialLinks from "../../components/SocialLinks";


function Footer() {


  return  (
  <Flex flexDirection="column" justifyContent="space-between" alignItems="center" margin={20}>
    <Box textAlign="center">
      <SocialLinks />
    </Box>
  </Flex>
  )
}
export default React.memo(Footer);
