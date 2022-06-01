import React, { useCallback } from 'react'
import { Text, Link } from '@crosswise/uikit'
import { useTranslation } from 'contexts/Localization'
import useENS from 'hooks/ENS/useENS'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getBscScanLink } from 'utils'
import { AutoColumn } from '../../../Layout/Column'
import { RowBetween } from '../../../Layout/Row'
import { InputPanel, ContainerRow, InputContainer, Input } from './styled'

export default function AddressInputPanel({
  id,
  value,
  onChange,
}: {
  id?: string
  // the typed string value
  value: string
  // triggers whenever the typed value changes
  onChange: (value: string) => void
}) {
  const { chainId } = useActiveWeb3React()

  const { t } = useTranslation()

  const { address, loading, name } = useENS(value)

  const handleInput = useCallback(
    (event) => {
      const input = event.target.value
      const withoutSpaces = input.replace(/\s+/g, '')
      onChange(withoutSpaces)
    },
    [onChange],
  )

  const error = Boolean(value.length > 0 && !loading && !address)

  return (
    <InputPanel id={id}>
      <ContainerRow error={error}>
        <InputContainer>
          <AutoColumn gap="md">
            <RowBetween>
              <Text>{t('Recipient')}</Text>
              {address && chainId && (
                <Link external small href={getBscScanLink(name ?? address, 'address', chainId)}>
                  ({t('View on BscScan')})
                </Link>
              )}
            </RowBetween>
            <Input
              className="recipient-address-input"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder={t('Wallet Address or ENS name')}
              error={error}
              pattern="^(0x[a-fA-F0-9]{40})$"
              onChange={handleInput}
              value={value}
            />
          </AutoColumn>
        </InputContainer>
      </ContainerRow>
    </InputPanel>
  )
}
