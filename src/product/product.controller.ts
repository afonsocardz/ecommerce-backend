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
import { CreateProductDto, SearchProductsDto } from './product.dto';
import {
  ApiOperation,
  ApiQuery,
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

  @Post('search')
  @ApiQuery({ name: 'searchQuery' })
  @ApiOperation({ summary: 'Search for products' })
  @ApiOkResponse({ type: [ProductEntity], isArray: true })
  async searchProducts(
    @Query() searchProductsDto: SearchProductsDto,
  ): Promise<ProductEntity[]> {
    return this.productService.searchProducts(searchProductsDto.searchQuery);
  }

  @Get()
  @ApiOperation({ summary: 'Find all products' })
  @ApiOkResponse({ type: [ProductEntity], isArray: true })
  async findAllProducts(): Promise<ProductEntity[]> {
    return this.productService.findAllProducts();
  }

  @Get(':productId')
  @ApiOperation({ summary: 'Find product by id' })
  @ApiParam({ name: 'productId' })
  @ApiOkResponse({ type: [ProductEntity] })
  async findProductById(@Query() productId: number): Promise<ProductEntity> {
    return this.productService.findProductById(productId);
  }
}
