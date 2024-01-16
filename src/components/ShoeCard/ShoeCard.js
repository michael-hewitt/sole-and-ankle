import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variant === 'on-sale' ? <SaleBanner>Sale</SaleBanner> : undefined}
          {variant === 'new-release' ? <NewBanner>Just released!</NewBanner> : undefined}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <PriceWrapper>
            <Price lineThrough={variant === 'on-sale'}>{formatPrice(price)}</Price>
            {variant === 'on-sale' ? <SalePrice>{formatPrice(price)}</SalePrice> : undefined}
          </PriceWrapper>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  position: relative;;
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const PriceWrapper = styled.span`
  position: absolute;
  top: 0;
  right: 0;
`;

const Price = styled.div`
  color: ${({lineThrough}) => lineThrough ? COLORS.gray[700] : undefined};
  text-decoration: ${({lineThrough}) => lineThrough ? 'line-through' : 'none'};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Banner = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  color: ${COLORS.white};
  font-size: ${14/16}REM;
  font-weight: ${WEIGHTS.bold};
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  border-radius: 2px;
`;

const SaleBanner = styled(Banner)`
  background-color: ${COLORS.primary};
`;

const NewBanner = styled(Banner)`
  background-color: ${COLORS.secondary};
`;

export default ShoeCard;
