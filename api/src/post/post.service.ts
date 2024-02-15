import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>) {}

 async create(createPostDto: CreatePostDto) {
    //const slug = createPostDto.title.toLowerCase().split(' ').join('-');
    // return this.postRepository.save({...createPostDto, slug});
    const post = new Post();
    post.userId=1;
    Object.assign(post,createPostDto);
    this.postRepository.create(post);
    return await this.postRepository.save(post);
  }

  async findAll() {
    return await this.postRepository.find();
  }

  async findOne(id: number) {
     const post = await this.postRepository.findOne({where:{id}});
     if(!post){
       throw new BadRequestException(`Post with id ${id} not found`);
     }
     return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    return await this.postRepository.update(id,updatePostDto);
  }

 async remove(id: number) {
    return await this.postRepository.delete(id);
  }
}
