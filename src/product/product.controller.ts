import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Query,
  Get,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, FilterProductsDto } from './product.dto';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiTags,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ProductEntity } from './product.entity';

@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Creates a product for e-commerce' })
  @ApiCreatedResponse({ type: [ProductEntity] })
  async createProduct(@Body() body: CreateProductDto): Promise<ProductEntity> {
    const { name, price, description, imageUrl } = body;
    return this.productService.createProduct(
      name,
      price,
      description,
      imageUrl,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Search for products' })
  @ApiOkResponse({ type: [ProductEntity], isArray: true })
  async getProducts(
    @Query() filters: FilterProductsDto,
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ): Promise<ProductEntity[]> {
    const skip = (page - 1) * perPage;
    return this.productService.getProducts(filters, skip, perPage);
  }

  @Get(':productId')
  @ApiOperation({ summary: 'Find product by id' })
  @ApiParam({ name: 'productId' })
  @ApiOkResponse({ type: [ProductEntity] })
  async findProductById(@Query() productId: number): Promise<ProductEntity> {
    return this.productService.findProductById(productId);
  }
}
