import Content from '../models/contentSchema.js';

export const getAllContents = async (req, res, next) =>
{
  try
  {
    const content = await Content.find();

    if (!content.length)
    {
      throw { statusCode: 404, message: 'Content not found' }
    }
    res.json(content);
  } catch (error)
  {
    next(error)
  }
}

export const getContentById = async (req, res, next) =>
{
  const { id } = req.params;
  try
  {
    const content = await Content.findById(id);
    if (!content)
    {
      throw { statusCode: 404, message: 'Content with this id is not available' }
    }
    res.json(content);
  } catch (error)
  {
    next(error)
  }
}

export const addContent = async (req, res, next) =>
{
  const { title, owner } = req.body;
  try
  {
    const content_url = req.file.path;
    console.log(content_url)
    const newContent = await Content.create({ title, owner, content_url });
    res.status(201).json(newContent);
  } catch (error)
  {
    next(error)
  }
}



export const updateContent = async (req, res, next) =>
{
  const { id } = req.params;
  const { title, owner, content_url } = req.body;
  try
  {
    const updatedContent = await Content.findByIdAndUpdate(id, { title, owner, content_url }, { new: true });
    if (!updateContent)
    {
      throw { statusCode: 404, message: 'Content with this id is not available' }
    }
    res.status(201).json(updatedContent);
  } catch (error)
  {
    next(error)
  }
}

export const addTagToContent = async (req, res, next) =>
{
  const { id } = req.params;
  const { tag } = req.body;

  try
  {
    const content = await Content.findById(id);
    if (!content)
    {
      throw { statusCode: 404, message: 'content not found' };
    }
    content.tags.push(tag);
    const updatedContent = await content.save();
    res.json(updateContent);
  } catch (error) { next(error) }
};


export const deleteContent = async (req, res, next) =>
{
  const { id } = req.params;
  try
  {
    await Content.findByIdAndDelete(id);
    res.json({ message: 'Content is deleted' })

  } catch (error)
  {
    next(error)
  }
}