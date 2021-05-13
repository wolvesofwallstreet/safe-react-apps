import { Text, Title, TextField } from '@gnosis.pm/safe-react-components';
import React, { useState } from 'react';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import styled from 'styled-components';
import { ProposedTransaction } from '../typings/models';

const Wrapper = styled.div`
  display: flex;
  justify-content: left;
  flex-direction: column;
  padding: 24px;
  width: 520px;
`;

const TextArea = styled.textarea`
  overflow-x: scroll;
  white-space:nowrap;
`;

const StyledTitle = styled(Title)`
  margin-top: 0px;
  margin-bottom: 5px;
`;

const StyledText = styled(Text)`
  margin-bottom: 15px;
`;

const StyledTextField = styled(TextField)`
  && {
    width: 520px;
  }
`;

const Main = () => {
  const { sdk, safe } = useSafeAppsSDK();

  const initValue: ProposedTransaction[] = [{to: "[address]", value: "[hex]", data: "[hex]" }];
  const [transactions, setTransactions] = useState<ProposedTransaction[]>(initValue);

  const handleTxInput = async (e: React.ChangeEvent<HTMLTextAreaElement>) =>  {
    const cleanInput = e.currentTarget?.value?.trim();
    let parsed = Object;
    try {
      parsed = JSON.parse(cleanInput);
      setTransactions(parsed);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSend = async (e: React.MouseEvent<HTMLButtonElement>) =>  {
    sdk.txs.send({ txs: transactions }).catch(console.error);
  }

  return (
    <Wrapper>
      <StyledTitle size="sm">Multisend raw transactions</StyledTitle>
      <StyledText size="sm">
        This app allows you to sent multiple raw transactions at once.{' '}
      </StyledText>

      {/* ABI Input */}
      <TextArea 
        rows={20}
        defaultValue={JSON.stringify(initValue, null, 2)}
        onChange={handleTxInput}
        spellCheck="false"/>
      <button onClick={handleSend}>Send Transaction</button>
    </Wrapper>
  );
};

export default Main;
