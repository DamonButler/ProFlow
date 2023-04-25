"""new tables

Revision ID: 5b1364026277
Revises: 5649cc0fe665
Create Date: 2023-04-25 12:42:53.659461

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5b1364026277'
down_revision = '5649cc0fe665'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_projects',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('project_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['project_id'], ['projects.id'], name=op.f('fk_user_projects_project_id_projects')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_user_projects_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('_password', sa.String(), nullable=False))
        batch_op.add_column(sa.Column('image', sa.String(), nullable=True))
        batch_op.drop_column('password')
        batch_op.drop_column('name')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.VARCHAR(), nullable=False))
        batch_op.add_column(sa.Column('password', sa.VARCHAR(), nullable=False))
        batch_op.drop_column('image')
        batch_op.drop_column('_password')
        batch_op.drop_column('username')

    op.drop_table('user_projects')
    # ### end Alembic commands ###