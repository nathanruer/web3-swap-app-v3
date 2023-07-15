'use client';

import { useCallback } from "react";
import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";

import Modal from './Modal';

interface SelectTokenInModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const SelectTokenInModal:React.FC<SelectTokenInModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const handleClick = useCallback((query: string, tokenAddress: string) => {
    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString())
    }
    const updatedQuery: any = {
      ...currentQuery,
      [query]: tokenAddress
    }
    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });
    router.push(url);
    onClose();
  }, [router, params, onClose]);

  return (
    <Modal 
      title="Select token in" 
      isOpen={isOpen} 
      onClose={onClose}
    >
      <button onClick={() => handleClick('from', '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2')}>
        <p>WETH</p>
      </button>
    </Modal>
  )
}

export default SelectTokenInModal;