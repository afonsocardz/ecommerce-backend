import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartProductsService } from './cart-products.service';
import { CreateCartProductDto } from './dto/create-cart-product.dto';
import { UpdateCartProductQtyDto } from './dto/update-cart-product.dto';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CartProductEntity } from './entities/cart-product.entity';
import { CartProductDto } from './dto/cart-product.dto';
import { AuthorizedRequest } from 'src/jwt/jwt.interface';

@Controller('cart-products')
@ApiTags('cart-products')
export class CartProductsController {
  constructor(private readonly cartProductsService: CartProductsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Add a product to users cart' })
  @ApiCreatedResponse({ type: [CartProductEntity] })
  async create(
    @Body() createCartProductDto: CreateCartProductDto,
    @Req() req: AuthorizedRequest,
  ): Promise<CartProductEntity> {
    const userId = req.userId;
    return await this.cartProductsService.create(createCartProductDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get product on cart with subtotals' })
  @ApiOkResponse({ type: [CartProductDto], isArray: true })
  async findCartProducts(
    @Req() req: AuthorizedRequest,
  ): Promise<CartProductDto[]> {
    const userId = req.userId;
    return await this.cartProductsService.findCartProducts(userId);
  }

  @Patch(':cartProductId')
  @ApiParam({ name: 'cartProductId' })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse()
  async updateCartProductQty(
    @Param('cartProductId') cartProductId: number,
    @Body() updateCartProductDto: UpdateCartProductQtyDto,
    @Req() req: AuthorizedRequest,
  ) {
    const userId = req.userId;
    await this.cartProductsService.updateCartProductQty(
      cartProductId,
      updateCartProductDto.quantity,
      userId,
    );
  }

  @Get(':productId')
  @ApiOkResponse()
  async findOne(
    @Param('productId') productId: number,
    @Req() req: AuthorizedRequest,
  ) {
    const userId = req.userId;
    return await this.cartProductsService.findOne(userId, productId);
  }

  @Delete(':cartProductId')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiParam({ name: 'cartProductId' })
  @ApiNoContentResponse()
  async remove(
    @Param('cartProductId') cartProductId: number,
    @Req() req: AuthorizedRequest,
  ) {
    const userId = req.userId;
    await this.cartProductsService.remove(cartProductId, userId);
  }
}
