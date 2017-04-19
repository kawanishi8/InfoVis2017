Vec3=function(x,y,z)
{
    this.x=x;
    this.y=y;
    this.z=z;
}
Vec3.prototype.add=function(v)
{
    this.x+=v.x;
    this.y+=v.y;
    this.z+=v.z;
    return this;
}
Vec3.prototype.sum=function()
{
    return this.x+this.y+this.z;
}
Vec3.prototype.min=function()
{
    a=this.x;
    if(a>this.y)
    {
	a=this.y;
    }
    if(a>this.z)
    {
	a=this.z;
    }
    return a;
}
Vec3.prototype.mid=function()
{
    a=this.x
    b=this.y;
    if(this.x<this.y)
    {
	a=this.y
	b=this.x;
    }
    if(this.z>a)
    {
	return a
    }
    else if(this.z<b)
    {
	return b;
    }
    else
    {
	return this.z;
    }
    return a;
}
Vec3.prototype.max=function()
{
    a=this.x;
    if(a<this.y)
    {
	a=this.y;
    }
    if(a<this.z)
    {
	a=this.z;
    }
    return a;
}
