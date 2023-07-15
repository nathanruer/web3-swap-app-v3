'use client';

import { useCallback } from "react";
import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";

import Modal from './Modal';

interface SelectTokenOutModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const SelectTokenOutModal:React.FC<SelectTokenOutModalProps> = ({
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
      title="Select token out" 
      isOpen={isOpen} 
      onClose={onClose}
    >
      <button onClick={() => handleClick('to', '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48')}>
        <p>USDC</p>
      </button>
    </Modal>
  )
}

export default SelectTokenOutModal;